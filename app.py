from flask import Flask, render_template, request,jsonify
import os, sys
import json
from crontab import CronTab

app = Flask(__name__)


@app.route("/mobile")
def mobile():
    """
    :return:
    """
    return render_template("mobile.html")


@app.route("/")
def api():
    return render_template("api.html")


@app.route("/api_post", methods=['POST'])
def api_post():
    service = request.form.get("name")
    domain = request.form.get('domain')
    port = request.form.get('port')
    path = request.form.get('path')
    tps = request.form.get('threads', 1000)

    app.config.from_pyfile("config.cfg")
    influx_host_ip = app.config.get('HOST_INFLUXDB_IP')
    grafana_host_ip = app.config.get('HOST_GRAFANA_IP')


    # f = open("static/data.json", mode="r")
    # res = f.read().decode("utf-8")
    # services_data = json.loads(res)
    # service_data = services_data[service]

    with open("template.jmx", "r") as f1:
        with open(service + ".jmx", "w") as f2:
            str_temp = f1.read().decode("utf-8")
            jmx_str = str_temp.replace("{{DOMAIN}}", domain).replace("{{PORT}}", port).replace(
                "{{PATH}}", path).replace("{{HOST_INFLUXDB_IP}}", influx_host_ip).replace(
                "{{NUM_THREADS}}", tps).encode("utf-8")
            f2.write(jmx_str)

    # execute timed task
    #  * * * * * python collect.py service+".jmx"
    script_dir = os.getcwd()
    my_user_cron = CronTab(user=True)
    shell_cmd = ". /dockerenv.txt; python " + os.path.join(script_dir, "collect.py") + " " + os.path.join(script_dir, service + ".jmx")
    job = my_user_cron.new(command=shell_cmd)
    job.setall('* * * * *')
    my_user_cron.write()

    return jsonify({"url": "http://" + grafana_host_ip + ":3000"})

if __name__ == '__main__':
    # reload(sys)
    # sys.setdefaultencoding('utf8')
    app.run(host='0.0.0.0', port=5000)
