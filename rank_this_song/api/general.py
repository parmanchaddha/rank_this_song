#-*- coding: utf-8 -*-
"""
Created on Sat Jun 27 12:00:00 2020

@author: Parmandeep Chaddha, Nathan Kredentser

Module:
    General functions used by the api that do no directly communicate with 
    the server.
"""

def _isint(this_num):
    """
    Function:
        Test whether a string (usually unicode) is an integer. 
    
    Args:
        this_num (str): The number of tracks the user requests for an artist.
    
    Returns:
        is_int (boolean): Is the input string an integer.
    """
    try:
        int(float(this_num)) # Sometime int(this_name) gives an error.
        is_int = True
    except ValueError:
        is_int = False
    return is_int