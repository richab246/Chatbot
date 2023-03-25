
import numpy as np
import nltk
# nltk.download('punkt')
from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()


def tokenize(sentence):
    return nltk.word_tokenize(sentence)

def stem(word):
    return stemmer.stem(word.lower())

def bag_of_words(tokenized_sentence, all_words):
    
    tokenized_sentence = [stem(w) for w in tokenized_sentence]

    bag = np.zeros(len(all_words) , dtype = np.float32)
    for index, w in enumerate(all_words):
        if w in tokenized_sentence:
            bag[index] = 1.0
    
    return bag

# Training Data Example

sentence = ['hello', 'how', 'are', 'you']
words = ['hi', 'hello', 'bye', 'goodbye', 'thank', 'cool', 'how']
bag = bag_of_words(sentence, words)
# print(bag)


#Testing the Stemming 
words = ['Organize', 'Organizing', 'organizes', 'panic','panicing']
stemmed_words = [stem(w) for w in words]




