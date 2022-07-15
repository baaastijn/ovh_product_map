#!/usr/bin/env python

from jinja2 import Environment, FileSystemLoader
import pandas as pd

# ----------------------------- Data loading

# Load the whole CSV files for categories and product list
# Be sure the CSV file is delimited separators as detailed below
df_models = pd.read_csv("csv_data/servicemodel.list.csv", sep=';')
df_phases = pd.read_csv("csv_data/phase.list.csv", sep=';')
df_datacenters = pd.read_csv("csv_data/datacenter.list.csv", sep=';')
df_categories = pd.read_csv("csv_data/category.list.csv", sep=';')
df_products = pd.read_csv("csv_data/product.list.csv", sep=';')

# Print in the CLI a small part of the CSV to check if the data is correctly loaded
print(df_products.head())


# ----------------------------- CSV to HTML for Datatables
# Datatables is a javascipt plugin for HTML table : https://datatables.net/ 

# Using Pandas function to_html() to convert the CSV dataframe into HTML
# WE add CSS class to get Bootstrap CSS support (striped rows)
df_html_table = df_products.to_html(table_id="product_raw_data", classes="table table-striped")


# ----------------------------- HTML Rendering
# Load the template
file_loader = FileSystemLoader('templates')
env = Environment(loader=file_loader)

# Rendering 1 : the product map
template = env.get_template('template.product.map.html')

# Render the HTML file
output = template.render(products=df_products, categories=df_categories, phases=df_phases, models=df_models, datacenters=df_datacenters)

# Write HTML output
with open("output/index.html", "w") as fh:
    fh.write(output)
    
    
# Rendering 2 : the product list
template = env.get_template('template.product.list.html')

# Render the HTML file
output = template.render(products=df_products, categories=df_categories, phases=df_phases, datacenters=df_datacenters)

# Write HTML output
with open("output/product.list.html", "w") as fh:
    fh.write(output)
    
# Rendering 3 : the product list   
template = env.get_template('template.product.datatable.html')

# render the HTML file
output = template.render(html_table=df_html_table)


# Write HTML output
with open("output/product.datatable.html", "w") as fh:
    fh.write(output)