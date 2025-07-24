#!/usr/bin/env python3
import requests
import datetime
import os

def ping_backend():
    backend_url = os.environ.get("BACKEND_URL")
    if not backend_url:
        print("Error: BACKEND_URL environment variable not set")
        return
    
    url = backend_url + "/health"  # Assuming the health endpoint is at /health
    if not url:
        print("Error: BACKEND_URL not set in .env file")
        return
    
    try:
        print(f"{datetime.datetime.now()}: Pinging {url}")
        response = requests.get(url, timeout=30)
        print(f"Response: {response.status_code}")
        
        if response.status_code == 200:
            print("Backend is alive")
        else:
            print(f"⚠️ Unexpected status code: {response.status_code}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    ping_backend()  # Just ping once, then exit