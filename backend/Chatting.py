import random
import json
import torch
from model import NeuralNet
from nltk_utils import tokenize, bag_of_words

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('D:/React-native/VoiceChatbot/backend/intents2.json', 'r') as f:
    intents = json.load(f)  

File = "data.h5"
data = torch.load(File)

input_size = data['input_size']
hidden_size = data['hidden_size']
output_size = data['output_size']
tags = data['tags']
all_words = data['all_words']
model_state = data['model_state']


model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()


bot_name = 'KalMifyn'
print('Lets Chat !!!,  type quit to exit')

def chat(prompt):
    sentence = tokenize(prompt)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X)

    output = model(X)
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    if prob.item() > 0.6: 
        for intent in intents['intents']:
            if tag == intent['tag']:
                return f"{bot_name} : {random.choice(intent['responses'])}"
    else:
        return f"{bot_name} : I do not understand....."


# while True:
#     sentence = input('You: ')
#     if sentence == 'quit':
#         break

#     sentence = tokenize(sentence)
#     X = bag_of_words(sentence, all_words)
#     X = X.reshape(1, X.shape[0])
#     X = torch.from_numpy(X)

#     output = model(X)
#     _, predicted = torch.max(output, dim=1)
#     tag = tags[predicted.item()]

#     probs = torch.softmax(output, dim=1)
#     prob = probs[0][predicted.item()]

#     if prob.item() > 0.6: 
#         for intent in intents['intents']:
#             if tag == intent['tag']:
#                 print(f"{bot_name} : {random.choice(intent['responses'])}")

#     else:
#         print(f"{bot_name} : I do not understand.....")

