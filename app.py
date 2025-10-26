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
    mol_list = [m.lower() for m in mol_list]

    with open('data.json', 'r') as f:
        data = json.load(f)

    # filtrage par molécule
    if mol_list:
        filtered = {}
        for city, points in data.items():
            filtered_points = [p for p in points if p['molecule'].lower() in mol_list]
            if filtered_points:
                filtered[city] = filtered_points
        return jsonify(filtered)

    return jsonify(data)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
