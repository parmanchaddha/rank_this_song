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
    this_connection = CreateWikipediaConnection(band_name=inputs[0],
                                                num_of_tracks=inputs[1])
    assert(this_connection.band_name == inputs[0])
    assert(this_connection.num_of_tracks == inputs[1])


@pytest.mark.parametrize("band_name, expected", [
        ("Beatles", True),
        ("the beatles", True), 
        ("The Beatles", True),
        ("hte beatles", False),
        ("Arctic Monkeys", True), 
        ("The Strokes", False),
    ])
def test_song_page_exist(band_name, expected): 
    """ Make sure song page results are correct """ 
    this_connection = CreateWikipediaConnection(band_name)
    assert (this_connection.does_song_page_exist == expected)

