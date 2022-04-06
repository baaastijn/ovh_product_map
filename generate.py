#!/usr/bin/env python

from jinja2 import Environment, FileSystemLoader
import pandas as pd

# Load the whole CSV file
# Be sure the CSV file is delimited with ";"
dataframe = pd.read_csv("data/products.csv", sep=',')

# Print in the CLI a small part of the CSV to check if the data is correctly loaded
print(dataframe.head())


# ----------------------------- Universe listing
# Get rows with universes lab
universes = dataframe[['universe_label','universe_name']]
# Remove duplicate ones
universes = universes.drop_duplicates(subset=['universe_name'])
# remove empty cells
universes = universes.dropna()

# ----------------------------- Phases listing
# Get rows with universes lab
phases = dataframe[['phase_label','phase_name']]
# Remove duplicate ones
phases = phases.drop_duplicates(subset=['phase_name'])
# remove empty cells
phases = phases.dropna()



# ----------------------------- Rendering
# Load the template
file_loader = FileSystemLoader('templates')
env = Environment(loader=file_loader)

template = env.get_template('template.product.map.html')

# render the HTML files
output = template.render(dataframe=dataframe, universes=universes, phases=phases)


# Write HTML output
with open("output/index.html", "w") as fh:
    fh.write(output)
    
    
template = env.get_template('template.product.list.html')

# render the HTML files
output = template.render(dataframe=dataframe, universes=universes, phases=phases)


# Write HTML output
with open("output/product.list.html", "w") as fh:
    fh.write(output)