"""
ebnf grammar check of the OpenUI specification
"""

import pprint
import json
from tatsu import parse
from tatsu.util import asjson
OPENUI_EXAMPLE = '../examples/Widgets/lists.example.json'
OPENUI_EBNF = '../EBNF.txt'

def main() -> None:
    try:
        OPENUI_GRAMMAR = open(OPENUI_EBNF, 'r').read()
    except Exception as e:
        print(f"Error reading grammar file : {e}")
        return
    try:
        json_data = open(OPENUI_EXAMPLE, 'r').read()
    except Exception as e:
        print(f"Error reading JSON file : {e}")
        return
    try:
        ast = parse(OPENUI_GRAMMAR, json_data, parseinfo=True)
    except Exception as e:
        print(f"Error parsing JSON data : {e}")
        return
    print('\nPPRINT')
    pprint.pprint(ast, indent=2, width=20)
    print('\nJSON')
    print(json.dumps(asjson(ast), indent=2))

if __name__ == '__main__':
    main()
