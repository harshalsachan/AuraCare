#!/usr/bin/env bash
# Compile C++ engine for Linux Cloud
g++ -shared -fPIC -o engine.so ../cpp_engine/core_engine.cpp

# Install Python dependencies
pip install -r requirements.txt