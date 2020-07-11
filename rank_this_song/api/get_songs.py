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

class CreateWikipediaConnection(object):
    """ 
    Class:
        Use wikipedia to search for songs by a particular artist.
        Currently, only supports artists that have a dedicated wikipedia page
        titled "List of Songs recorded by ______artist name____. 
    
    Args:
        band_name (str): The name of the band being searched
        num_of_tracks (int): How many tracks to get for that band. No max enforced.
    
    Private Methods: 
        __init__ (func): Initialize the wikipedia connection and find the wikipedia page.
        _fetch_data_from_wikipedia (func): Fetch the HTML from wikipedia.
        _parse_songs_from_html (func): Create a songs dataframe by parsing HTML table.
        
    Public Methods: 
        get_songs (func): Get a list of songs from the wikipedia songs df. 
    
    Example Usage:
        songs_wiki = CreateWikipediaConnection(band_name="The Beatles",
                                               num_of_tracks=16)
        songs = songs_wiki.get_songs()
    """
    def __init__(self, band_name:str = None, num_of_tracks:int=16):
        """ Use Wikipedia to search for songs. """
        self.band_name = band_name
        self.num_of_tracks = num_of_tracks
        self.does_song_page_exist = self._get_song_page_exist(band_name)
        if self.does_song_page_exist:
            self.song_page_content = self._fetch_data_from_wikipedia(band_name)
            self.songs_df = self._parse_songs_from_html(self.song_page_content)
        else:
            self.song_page_content = None
            self.songs_df = pd.DataFrame(data=[], columns=["artist", "tracks"])
        return

    def _get_song_page_exist(self, band_name:str=None): 
        """
        Function: 
            Check to see if `Songs Recorded by Band_Name` exists on Wikipedia
            If it does, YAY! This makes it much easier to pull data.
        
        Return:
            does_song_page_exist (bool): Does the page exist? 
        """
        if not band_name:
            raise Exception("Please enter a band name!")

        try:
            check_page_url = wikipedia.page(f"List of Songs recorded by {band_name}").url
            if (SONG_PAGE_PATTERN in check_page_url 
                and (band_name.lower() in check_page_url.lower()
                     or band_name.replace(" ", "_").lower() in check_page_url.lower())):    
                does_song_page_exist = True
            else:
                does_song_page_exist = False
        except wikipedia.PageError as e:
            does_song_page_exist = False
        return does_song_page_exist


    def _fetch_data_from_wikipedia(self, band_name:str = None):    
        """ Fetch data from a wikipedia page based on a band name """
        songs_page = wikipedia.page(f"List of Songs recorded by {band_name}")
        page_content = songs_page.html()
        return page_content

    def _parse_songs_from_html(self, html_string: str = None):
        """ Parse song names from an HTML- Currently limited to table objects"""
        list_of_tables_in_html = pd.read_html(html_string)
        songs_df = None
        for table in list_of_tables_in_html:
            if len([i for i in table.columns if str(i).lower() in ["title", "song", "name"]]):
                print("Yay, found the songs table!")
                songs_df = table
                break
        return songs_df
    
    def get_songs(self):
        if (self.songs_df).empty:
            return []
        songs_col = [i for i in self.songs_df.columns if (
                str(i).lower() in ["title", "song", "name"])][0]
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
    
    def get_tracks_by_band(self, band_name:str=None, num_of_tracks:int=16):
        """ 
        Function:
            Get a list of songs by input band.
        
        Args: 
            band_name (str): The name of the band being searched
            num_of_tracks (int): How many tracks to get for that band. Max = 50
        
        Return:
            songs (list): A list of songs by input band.
        """
        if not band_name:
            raise Exception("Please add a band name in order to see a list of tracks")
        search_query = r"artist:{}&type=track".format(band_name)
        response = self.spotify_api.search(q=f"artist:{band_name}",
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