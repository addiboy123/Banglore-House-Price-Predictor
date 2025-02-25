import json,pickle
import numpy as np

__locations=None
__data_columns=None
__model=None

def get_estimated_price(location,sqft,bath,bhk):
    try:
        loc_index=__data_columns.index(location.lower())
    except:
        loc_index=-1
    x_t=np.zeros(len(__data_columns))
    x_t[0]=sqft
    x_t[1]=bath
    x_t[2]=bhk
    if loc_index>=0:
        x_t[loc_index]=1
    return round(__model.predict([x_t])[0],2)


def get_location_names():
    return __locations
def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __data_columns,__locations, __model
    with open('./artifacts/columns.json','r') as f:
        __data_columns=json.load(f)['data_columns']
        __locations=__data_columns[3:]

    with open('./artifacts/banglore_home_prices_model.pickle','rb') as f:
        __model=pickle.load(f)
        pass

    print("loading saved artifacts...done")

if __name__=='__main__':
    load_saved_artifacts()
    print(get_estimated_price('1st Phase JP Nagar',1000,2,2))
    # print(get_location_names())