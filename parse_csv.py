import csv
import json


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
            data.append(
                {
                    'id': index,
                    'committer': item['committer'],
                    'issue_id': item['issue_id'],
                    'commit_msg': item['commit_msg'],
                    'start': item['commit_date'],
                    'group': group_map[repo_name],
                    'repo_name': repo_name,
                    'cpython_type': cpython_type
                }
            )
    with open('./contrib_data.js', 'w+') as file:
        file.write("var contrib_data = {};".format(json.dumps(data)))


if __name__ == '__main__':
    parse_csv_to_json('./contrib_data.csv')


