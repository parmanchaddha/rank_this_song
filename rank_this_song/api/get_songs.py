# -*- coding: utf-8 -*-
"""
Created on Fri Jun 26 22:45:55 2020

@author: Parmandeep Chaddha

Module songs_api.py: 
    Communicate with Wikipedia or Spotify to get a list of songs by a band.
    We want to limit Spotify usage, as the usage is monitored through credentials.
    
Requires:
    wikipedia (pip install wikipedia)
    spotipy (pip install spotipy)
"""
import pandas as pd
import re

import wikipedia
import spotipy
from credentials import APP_CLIENT

SONG_PAGE_PATTERN = "List_of_songs_recorded_by"
DISCOGRAPHY_PATTERN = "discography"
EXPECTED_SONG_COLUMNS = ["title", "song", "tracks", "name"]
ALBUM_TITLE_COLUMN = ["title"]
COLUMNS_IN_ALBUM_PAGE = ['No.', 'Title', 'Length']

class CreateWikipediaConnection(object):
    """ 
    Class:
        Use wikipedia to search for songs by a particular artist.
        Currently, only supports artists that have a dedicated wikipedia page
        titled "List of Songs recorded by ______artist name____. 
    
    Args:
        artist_name (str): The name of the band being searched
        num_of_tracks (int): How many tracks to get for that band. No max enforced.
    
    Private Methods: 
        __init__ (func): 
            Initialize the wikipedia connection
            Find the wikipedia page
            Get a list of tracks by an artist.

        _get_song_page_exist (func): Check to see if "list_of_tracks_recorded_by_artist exists."
        _fetch_song_data_from_wikipedia (func): Fetch the HTML from the artist song page.
        
        _get_disc_page_exist (func): Check to see if "artist_discography" page exists.

    Public Methods: 
        get_songs (func): Get a list of songs from the wikipedia songs df. 
    
    Example Usage:
        songs_wiki = CreateWikipediaConnection(artist_name="The Beatles",
                                               num_of_tracks=16)
        songs = songs_wiki.get_songs()
    """
    def __init__(self, artist_name:str = None, num_of_tracks:int=16):
        """ Use Wikipedia to search for songs. """
        self.artist_name = artist_name
        self.num_of_tracks = num_of_tracks
        
        if CreateWikipediaConnection._get_song_page_exist(artist_name):
            self.songs_df = self._fetch_song_data_from_wikipedia(artist_name)
            return
        elif CreateWikipediaConnection._get_disc_page_exist(artist_name):
            self.albums_df = self._fetch_disc_data_from_wikipedia(artist_name)
            self.songs_df = self._fetch_song_data_from_albums(artist_name)
        else:
            self.songs_df = pd.DataFrame(data=[], columns=["artist", "tracks"])
        return

    @staticmethod
    def _get_song_page_exist(artist_name:str=None): 
        """
        Function: 
            Check to see if `Songs Recorded by artist_name` exists on Wikipedia
            If it does, YAY! This makes it much easier to pull data.
        Args:
            artist_name (str): Name of the artist whose songs are being searched.
        Return:
            does_song_page_exist (bool): Does the page exist? 
        """
        if not artist_name:
            raise Exception("Please enter a band name!")

        does_song_page_exist = False
        try:
            check_page_url = wikipedia.page(f"List of Songs recorded by {artist_name}").url
            if (SONG_PAGE_PATTERN in check_page_url 
                and (artist_name.lower() in check_page_url.lower()
                     or artist_name.replace(" ", "_").lower() in check_page_url.lower())):    
                does_song_page_exist = True
        except wikipedia.PageError:
            pass
        return does_song_page_exist

    @staticmethod
    def _get_disc_page_exist(artist_name:str = None): 
        """
        Function:
            Check to see if "artist_discography" page exists.
        Args:
            artist_name (str): Name of the artist whose songs are being searched.
        Return:
            does_disc_page_exist (bool): True if discography page exists. False otherwise.
        """
        if not artist_name:
            raise Exception("Please enter a band name!")
        
        does_disc_page_exist = False
        try:
            check_page_url = wikipedia.page(f"{artist_name}_{DISCOGRAPHY_PATTERN}").url
            if (DISCOGRAPHY_PATTERN in check_page_url
                and (artist_name.lower() in check_page_url.lower()
                     or artist_name.replace(" ", "_").lower() in check_page_url.lower())):    
                does_disc_page_exist = True
        except wikipedia.PageError:
            pass
        return does_disc_page_exist

    def _fetch_song_data_from_wikipedia(self, artist_name:str = None):    
        """ Fetch data from a wikipedia page based on a band name """
        songs_page = wikipedia.page(f"List of Songs recorded by {artist_name}")
        page_content = songs_page.html()
        list_of_tables_in_html = pd.read_html(page_content)
        songs_df = None
        for table in list_of_tables_in_html:
            if len([i for i in table.columns if str(i).lower() in EXPECTED_SONG_COLUMNS]):
                songs_df = table
                break
        return songs_df
    
    def _fetch_disc_data_from_wikipedia(self, artist_name:str = None):
        """ Fetch discography information from the artist, and obtain the songs
        by iterating through the albums.
        """
        albums_page = wikipedia.page(f"{artist_name}_{DISCOGRAPHY_PATTERN}")
        list_of_tables_in_html = pd.read_html(albums_page.html())
        albums_df = None
        for table in list_of_tables_in_html:
            if isinstance(table.columns, pd.MultiIndex):
                table.columns = table.columns.get_level_values(0)
            table.columns = map(str.lower, table.columns)
            if set(ALBUM_TITLE_COLUMN).issubset(set(table.columns)):
                albums_df = table
                break
        albums_df = albums_df[~albums_df.title.str.contains("denotes album that")]
        return albums_df
    
    def _fetch_song_data_from_albums(self, artist_name:str = None):
        """ Populates song df by iterating through the artist's albums. """
        if self.albums_df.empty:
            return None
        songs = {"artist": artist_name, "tracks": []}
        for index, album_name in self.albums_df.iterrows():
            print(f"Processing {album_name['title']}")
            this_album = Album(album_name=album_name['title'])
            songs_from_album = this_album.get_songs_from_album()
            if songs_from_album and len(songs_from_album):
                songs["tracks"]  += songs_from_album
        return pd.DataFrame(songs)
    
    def get_songs(self):
        if (self.songs_df).empty:
            return []
        songs_col = [i for i in self.songs_df.columns if (
                str(i).lower() in EXPECTED_SONG_COLUMNS)][0]
        songs = self.songs_df[songs_col].astype(str).tolist()
        return songs


class Album(object): 
    """ 
    Class:
        Read the wikipedia page for the input album. Be able to return various
        information.
    
    Args (required):
        album_name (str): Name of the album for which this object is created.
    
    Public Methods:
        get_songs_from_album (func): Return a list of songs for the album
        get_album_information (func): Return a list of generic album information
            such as release_date, artist_name, num_of_tracks, etc.
    """ 
    def __init__(self, album_name:str, artist_name:str=None):
        """ Create the connection to the album WikiPedia page."""
        if not album_name:
            raise Exception("Album name cannot be empty")
        self.album_page = self._get_album_page(album_name)
        
        pass
    
    def _get_album_page(self, album_name):
        """ Check to see if the page for the album exists """
        try: 
            album_page = wikipedia.page(album_name)
            page_url = album_page.url.lower()
            if album_name.lower().replace(" ", "_") not in page_url:
                album_page = None
        except wikipedia.DisambiguationError as e:
            album_page = None
        return album_page
        
    def get_songs_from_album(self): 
        """ Return a list of songs from the album."""
        if self.album_page is None:
            return None

        list_of_tables_in_html = pd.read_html(self.album_page.html())
        songs_df = pd.DataFrame(data = [])
        for table in list_of_tables_in_html:
            if set(COLUMNS_IN_ALBUM_PAGE).issubset(set(table.columns)):
                songs_df = table
                break
        if songs_df.empty:
            return []
        songs_list = songs_df.Title.apply(lambda x: x.replace('"', '')).tolist()
        if "Total length:" in songs_list:
            songs_list.remove("Total length:") 
        self.songs = songs_list
        return self.songs


class CreateSpotfiyConnection(object):
    """ 
    Class:
        Use spotify to search for songs
        Requires user credentials to communicate with the Spotify API
    
    Args:
        None
    
    Private Methods:
        __init__ (fun): Initializes the spotify connection.
    
    Public Methods:
        get_tracks_by_band (fun): Get a list of songs by input band.
        
    Example Usage: 
        spotify_connection = CreateSpotfiyConnection()
        songs = spotify_connection.get_tracks_by_param("Strokes")        
    """
    def __init__(self):
        """ Initializes the spotify connection. """
        self.client = APP_CLIENT
        self.spotify_api = spotipy.Spotify(auth_manager=self.client)
        return
    
    def get_tracks_by_band(self, artist_name:str=None, num_of_tracks:int=16):
        """ 
        Function:
            Get a list of songs by input band.
        
        Args: 
            artist_name (str): The name of the band being searched
            num_of_tracks (int): How many tracks to get for that band. Max = 50
        
        Return:
            songs (list): A list of songs by input band.
        """
        if not artist_name:
            raise Exception("Please add a band name in order to see a list of tracks")
        search_query = r"artist:{}&type=track".format(artist_name)
        response = self.spotify_api.search(q=f"artist:{artist_name}",
                                           type="track",
                                           limit=num_of_tracks)
        songs = [i["name"] for i in response["tracks"]["items"]]
        return songs

if __name__ == "__main__":
    drake = CreateWikipediaConnection("drake")
    songs = drake.get_songs()
    
#    views = Album("Views")
#    songs = views.get_songs_from_album()