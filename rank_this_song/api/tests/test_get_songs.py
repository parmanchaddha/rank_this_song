# -*- coding: utf-8 -*-
"""
Created on Fri Jun 26 22:45:55 2020

@author: Parmandeep Chaddha

This is the test file for get songs. 
"""
import pytest
from get_songs import CreateWikipediaConnection


@pytest.mark.parametrize("inputs, expected", [
        (["Beatles", 16], True),
        (["Arctic Monkeys", 8], True), 
        (["The Strokes", 8], False),
    ])
def test_band_and_numtracks(inputs, expected):
    """ Make sure band name and num of songs are correct""" 
    this_connection = CreateWikipediaConnection(artist_name=inputs[0],
                                                num_of_tracks=inputs[1])
    assert(this_connection.artist_name == inputs[0])
    assert(this_connection.num_of_tracks == inputs[1])


@pytest.mark.parametrize("artist_name, expected", [
        ("Beatles", True),
        ("the beatles", True), 
        ("The Beatles", True),
        ("hte beatles", False),
        ("Arctic Monkeys", True), 
        ("The Strokes", False),
    ])
def test_song_page_exist(artist_name, expected): 
    """ Make sure song page results are correct """ 
    does_song_page_exist = CreateWikipediaConnection._get_song_page_exist(artist_name)
    assert (does_song_page_exist == expected)


@pytest.mark.parametrize("artist_name, expected", [
        ("Ed Sheeran", True),
        ("Ed_Sheeran", True), 
        ("ed_sheeran", True),
        ("ed sheeran", True),
        ("ed sheeren", False),  # Sheeren spelled wrong not caught by wikipedia. 
    ])
def test_disc_name_exist(artist_name, expected): 
    """ Make sure song page results are correct """ 
    does_disc_page_exist = CreateWikipediaConnection._get_disc_page_exist(artist_name)
    assert (does_disc_page_exist == expected)

