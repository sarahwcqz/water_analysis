from flask import Flask, jsonify, request, render_template
import json

app = Flask(__name__)

# -------------------------------- index ------------------------------ #
@app.route('/')
def index():
    return render_template('index.html')


# ---------------------------- selected mol --------------------------- #
@app.route('/data')
def get_data_filtered():
    mol_list = request.args.getlist('molecule')  # liste de molécules cochées
    mol_list = [m.lower() for m in mol_list]    # met tout en lower_case

    with open('data.json', 'r') as f:
        data = json.load(f)

    if mol_list:
        data = [p for p in data if p['molecule'].lower() in mol_list]
        # list comprehension : ajoute p, pour chaque p de data qui remplit la condition:
        # fait parti de la liste cochee

    return jsonify(data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
