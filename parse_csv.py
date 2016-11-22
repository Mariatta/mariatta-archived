#!/usr/bin/env python

import csv
import json
from datetime import datetime

group_map = {
    'cpython': 0,
    'pythondotorg': 1,
    'peps': 3,
    'devguide': 2,
}


def parse_csv_to_json(filename):
    data = []
    with open(filename, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for index, item in enumerate(reader):
            repo_name = item['repo']
            cpython_type = repo_name == 'cpython'
            data_dict = {
                    'id': index,
                    'committer': item['committer'],
                    'issue_id': item['issue_id'],
                    'commit_msg': item['commit_msg'],
                    'start': item['commit_date'],
                    'group': group_map[repo_name],
                    'repo_name': repo_name,
                    'cpython_type': cpython_type,
                }
            commit_date = datetime.strptime(item['commit_date'], '%Y-%m-%d')
            upload_date = datetime.strptime(item['upload_date'], '%Y-%m-%d')
            age = (commit_date.date() - upload_date.date()).days
            if age > 0:
                data_dict['has_age'] = True
                if age == 1:
                    data_dict['age'] = "{} day".format(age)
                else:
                    data_dict['age'] = "{} days".format(age)
            data.append(data_dict)
    with open('./javascripts/contrib_data.js', 'w+') as file:
        file.write("var contrib_data = {};".format(
            json.dumps(
                data,
                indent=4,
                sort_keys=True
            )))


if __name__ == '__main__':
    parse_csv_to_json('./contrib_data.csv')


