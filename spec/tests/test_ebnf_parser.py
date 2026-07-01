"""
ebnf grammar check of the OpenUI specification
"""

from tatsu import compile
from tatsu.util import asjson
OPENUI_EBNF = '../EBNF.txt'

def main() -> None:
    OPENUI_GRAMMAR: str = ''
    try:
        OPENUI_GRAMMAR = open(OPENUI_EBNF, 'r').read()
    except Exception as e:
        print(f"Error reading grammar file : {e}")
        return
    try:
        ast = compile(OPENUI_GRAMMAR)
    except Exception as e:
        print(f"Error parsing : {e}")
        return

if __name__ == '__main__':
    main()
