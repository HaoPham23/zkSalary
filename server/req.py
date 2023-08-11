import requests

# URL of the server
url = "http://localhost:8000/proofCalculate"
data = {
    "identifier": "083203011953",
    "salary": "3500000",
    "upper": "4000000",
    "lower": "1000000"
}

# Make a GET request
response = requests.post(url, json=data)
print(response.json())