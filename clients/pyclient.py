try: 
  import requests, os
  username = ""
  password = ""
  project = ""
  def get(key):
    return eval(requests.get(f"https://jdb.amoghthecool.repl.co/data/{username}/{project}/{password}").text)[key]
  def set(key, value):
    requests.get(f"https://jdb.amoghthecool.repl.co/set/{username}/{project}/{key}/{value}/{password}")

  username = "AmoghTheCool"
  project = "Poll"
  password = os.environ["password"]
  print(get("apples"))
except:
  import os
  os.system("pip install requests")