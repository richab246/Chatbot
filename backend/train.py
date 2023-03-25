import torch
import torch.nn as nn
from torch.utils.data import Dataset,DataLoader

import numpy as np
import json
from nltk_utils import tokenize, stem, bag_of_words

from model import NeuralNet

with open('D:/React-native/VoiceChatbot/backend/intents2.json', 'r') as f:
    intents = json.load(f)

# print(intents)

all_words = []
tags = []
pattern_tags = []

for intent in intents['intents']:
    tag = intent['tag']
    tags.append(tag)
    for pattern in intent['patterns']:
        w = tokenize(pattern)
        all_words.extend(w)
        pattern_tags.append((w, tag))

ignore_words = ['.', ',', '/', '?']
all_words = [stem(w) for w in all_words if w not in ignore_words]
all_words = sorted(set(all_words))
tags = sorted(set(tags))



X_train = []
Y_train = []


for (pattern_sentence, tag) in pattern_tags:
    bag = bag_of_words(pattern_sentence, all_words)
    X_train.append(bag)

    label = tags.index(tag)
    Y_train.append(label)

X_train = np.array(X_train)
Y_train = np.array(Y_train)

class ChatDataset(Dataset):
    def __init__(self):
        self.n_samples = len(X_train)
        self.x_data = X_train
        self.y_data = Y_train

    def __getitem__(self, index):
        return self.x_data[index], self.y_data[index]
    
    def __len__(self):
        return self.n_samples


# Hyperparameter
batch_size = 8
hidden_layer = 8
output_size = len(tags)
input_size = len(all_words)
learning_rate = 0.001
n_epochs = 1000

dataset = ChatDataset()
train_loader = DataLoader(dataset=dataset, batch_size=batch_size, shuffle = True)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = NeuralNet(input_size, hidden_layer, output_size).to(device)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr = learning_rate)

for epoch in range(n_epochs):
    for (words, labels) in train_loader:
        words = words.to(device)
        labels = labels.to(dtype=torch.long).to(device)
        
        # Forward pass
        outputs = model(words)
        loss = criterion(outputs, labels)
        
        # Backward and optimize
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    
    if (epoch +1) % 100 == 0:
        print(f"epoch {epoch+1}/{n_epochs} , loss = {loss.item():.4f}")

print(f"final Loss , loss = {loss.item():.4f}")


data = {
    "model_state" : model.state_dict(),
    "input_size" : input_size,
    "output_size" : output_size,
    "hidden_size" : hidden_layer,
    "all_words" : all_words,
    "tags" : tags
}


File = "data.h5"
torch.save(data, File)

print(f"Training complete and file saved to {File}")


