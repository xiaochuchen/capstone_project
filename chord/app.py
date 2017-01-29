from flask import Flask, render_template, Response
app_linda = Flask(__name__)

@app_linda.route('/main')
def chart():
    return render_template('skills.html')

#@app_lulu.route('/correlated.json')
#def chart_data():
#    json_dat = open("D:/Data Incubator/capstone_project/templates/correlated.json", "rb").read()
#    resp = Response(response=json_dat, status=200, mimetype="application/json")
#    return(resp)

if __name__ == '__main__':
    #app_linda.run(debug=True)
    port = int(os.environ.get("PORT", 5000))
    app_linda.run(host='0.0.0.0', port=port)
