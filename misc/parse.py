#!/usr/bin/python
#
# Small script to parse Apache access.log files for wrong answers to certain
# levels (404 requests) in order to add more "dead ends".

import argparse
import collections
import re

parser = argparse.ArgumentParser()
parser.add_argument('level', type=int, help='The level number')
args = parser.parse_args()

pattern = re.compile('"GET /curiosity/level{:>03}/([^ ]+) [^"]*" 404'.format(args.level))

names = collections.Counter()

with open("access.log") as log:
    for line in log.readlines():
        res = pattern.search(line)

        if res:
            name = res.groups()[0]
            names[name] += 1

for page, count in names.most_common(20):
    print("{count:<5} {page}".format(count=count, page=page))
