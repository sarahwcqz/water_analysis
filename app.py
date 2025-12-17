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
    mol_list = request.args.getlist('molecule')

    with open('data.json', 'r') as f:
        data = json.load(f)

    result = {}

    for city, info in data.items():
        coords = info["coords"]
        points = info["points"]
    
    # filtrage par molécule
        if mol_list:
            filtered_points = {
                mol: conc
                for mol, conc in points.items()
                if mol in mol_list
            }
        else:
            filtered_points = points

        if filtered_points:
            result[city] = {
                "coords": coords,
                "points": filtered_points
            }

    return jsonify(data)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
