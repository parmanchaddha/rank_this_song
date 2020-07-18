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

         
        print(CreateWikipediaConnection._get_disc_page_exist(artist_name))
        
        self.songs_df = pd.DataFrame(data=[], columns=["artist", "tracks"])
        return


    @staticmethod
    def _get_song_page_exist(artist_name:str=None): 
        """
        Function: 
            Check to see if `Songs Recorded by artist_name` exists on Wikipedia
            If it does, YAY! This makes it much easier to pull data.
        
        Return:
            does_song_page_exist (bool): Does the page exist? 
        """
        if not artist_name:
            raise Exception("Please enter a band name!")

        try:
            check_page_url = wikipedia.page(f"List of Songs recorded by {artist_name}").url
            if (SONG_PAGE_PATTERN in check_page_url 
                and (artist_name.lower() in check_page_url.lower()
                     or artist_name.replace(" ", "_").lower() in check_page_url.lower())):    
                does_song_page_exist = True
            else:
                does_song_page_exist = False
        except wikipedia.PageError as e:
            does_song_page_exist = False
        return does_song_page_exist


    def _fetch_song_data_from_wikipedia(self, artist_name:str = None):    
        """ Fetch data from a wikipedia page based on a band name """
        songs_page = wikipedia.page(f"List of Songs recorded by {artist_name}")
        page_content = songs_page.html()
        list_of_tables_in_html = pd.read_html(page_content)
        songs_df = None
        for table in list_of_tables_in_html:
            if len([i for i in table.columns if str(i).lower() in EXPECTED_SONG_COLUMNS]):
                print("Yay, found the songs table!")
                songs_df = table
                break
        return songs_df


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
            check_page_url = wikipedia.page(f"{artist_name}_discography").url
            if (DISCOGRAPHY_PATTERN in check_page_url
                and (artist_name.lower() in check_page_url.lower()
                     or artist_name.replace(" ", "_").lower() in check_page_url.lower())):    
                does_disc_page_exist = True
        except wikipedia.PageError:
            pass
        return does_disc_page_exist
    
    def get_songs(self):
        if (self.songs_df).empty:
            return []
        songs_col = [i for i in self.songs_df.columns if (
                str(i).lower() in EXPECTED_SONG_COLUMNS)][0]
        songs = self.songs_df[songs_col].astype(str).tolist()
        return songs


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

#    songs_wiki = CreateWikipediaConnection("Beatles", num_of_tracks=16)
    # wiki_songs = songs_wiki.get_songs()   
    for i in ["Beatles", "the beatles", "The Beatles", "hte beatles", "Arctic Monkeys", "The Strokes"]:
        song_page = CreateWikipediaConnection(i)
        print(len(song_page.get_songs()))
    # spotify_connection = CreateSpotfiyConnection()
    # spotify_songs = spotify_connection.get_tracks_by_band("Strokes", 16) 