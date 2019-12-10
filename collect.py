# coding=utf-8
import os
import sys
cmd = "/jmeterdocker/apache-jmeter-5.2.1/bin/jmeter  -n -t "+sys.argv[1]
os.system(cmd)