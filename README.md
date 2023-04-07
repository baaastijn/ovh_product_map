# PoC / OVHcloud product map

Another way to display OVHcloud products !
Proof of concept, unrelated to our CX/UX Designers Teams. That's why it's ugly.


## See in action

Just go to [https://www.product-map.ovh/](https://www.product-map.ovh/)

## Request a modification on a product information

Please create a pull request directly on this repository, thanks !

## Generate yourself

Download the code, install requirements (Jinja2 and Pandas only) then run Python code **generate.py**.

Example code :

```
# Clone this repo
gh repo clone baaastijn/ovh_product_map

# Go inside this repo
cd baaastijn/ovh_product_map

# Create a new python environment. Install Conda first
conda create -n productMap --file requirements.txt

# activate newly created environment
conda activate productMap

# Launch the script
python3 generate.py

# Done. open the page index.html in the repository
```

That's all, output is in *output* folder.

Comments, feedback : use Github or reach me on Twitter / @BastienOVH

Have fun.
