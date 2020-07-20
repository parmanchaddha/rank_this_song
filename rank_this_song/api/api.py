# -*- coding: utf-8 -*-
"""
Created on Sat Jun 27 12:00:00 2020

@author: Parmandeep Chaddha, Nathan Kredentser

Module:
    RESTful API to communicate with the frontend.
"""

import flask 
from flask import request, jsonify
from flask_cors import CORS

import get_songs
import general

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

@app.route("/", methods = ["GET"])
def api_home():
    return ("<h1> This is the 'Rank This Song' API </h1> <p> I can't believe you found it!</p")

@app.route("/get_songs_by_band", methods = ["GET"])
def get_songs_by_band():
    """ Send a list of songs based on the band name."""

    if "artist_name" not in request.args: 
        return(jsonify([{"error": "Bad Request, must include artist_name",
                        "code": 400}]))
    artist_name = request.args["artist_name"]

    num_of_tracks = 16
    if "num_of_tracks" in request.args and general._isint(request.args["num_of_tracks"]):
        num_of_tracks = int(request.args["num_of_tracks"])

    band_wiki = get_songs.CreateWikipediaConnection(artist_name=artist_name,
                                                    num_of_tracks=num_of_tracks)
    songs = band_wiki.get_songs()
    songs = [i.replace('"', "") for i in songs]
    return jsonify({"songs": songs})

if __name__ == "__main__":
    app.run()