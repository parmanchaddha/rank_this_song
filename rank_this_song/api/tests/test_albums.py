# -*- coding: utf-8 -*-
"""
Created on Sat Jul 18 2020

@author: Parmandeep Chaddha

This is the test file for the albums object in get_songs.py. 
"""
import pytest
from get_songs import Album

GENERIC_ALBUM_TITLE = "Is This It"

@pytest.fixture
def this_album():
    this_album = Album(GENERIC_ALBUM_TITLE)
    return this_album

def test_album_page(this_album):
    # Confirm that the album page is found (not empty)
    assert(this_album.album_page is not None)
    this_url = this_album.album_page.url.lower()
    assert( GENERIC_ALBUM_TITLE.lower().replace(" ", "_") in this_url)

