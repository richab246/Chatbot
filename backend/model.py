import torch
import torch.nn as nn


class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_layer, n_classes):
       super(NeuralNet, self).__init__()
       self.l1 = nn.Linear(input_size, hidden_layer)
       self.l2 = nn.Linear(hidden_layer, hidden_layer)  
       self.l3 = nn.Linear(hidden_layer, n_classes)
       self.Relu = nn.ReLU()

    def forward(self, x):
        out = self.l1(x)
        out = self.Relu(out)
        out = self.l2(out)
        out = self.Relu(out)
        out = self.l3(out)
        return out

