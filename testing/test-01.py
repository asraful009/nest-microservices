import requests
import threading
from random import randrange
import datetime

def getUrl(limit) :
  url = f"http://localhost:3000/?limit={limit}"
  payload = {}
  headers= {}
  i=0
  while i<100:
    try:
      s = datetime.datetime.now()
      response = requests.request("GET", url, headers=headers, data = payload)
      diff = datetime.datetime.now() - s
      print(f"{url} =>> {response.text.encode('utf8')} => {diff}")
    except Exception as err:
      pass 
    i += 1


def main() :
  i = 0
  while (i < 100) :
    x = threading.Thread(target=getUrl, args=(randrange(100000, 200000),))
    x.start()
    i+=1

if __name__ == "__main__" :
  main()

