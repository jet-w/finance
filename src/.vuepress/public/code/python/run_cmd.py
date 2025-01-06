import os
import sys

sys.path.append(os.path.dirname(__file__))
import argparse
from thread_util import thread_util
import ctypes


def parse_args():
    parser = argparse.ArgumentParser()

    parser.add_argument('--cmd', type=str)
    parser.add_argument('--sleep', default=False, action=argparse.BooleanOptionalAction)
    return parser.parse_args()

def download(cmd):
    print(cmd)
    os.system(cmd)

if __name__ == "__main__":
    args = parse_args()
    thread_obj = thread_util(40)
    with open(args.cmd, 'r') as fr:
        cmd = fr.readline()
        while len(cmd) > 0:
            thread_obj.process(download, (cmd,),cmd)
            cmd = fr.readline()
    thread_obj.wait()
    if args.sleep:
        # Call the Windows API to put the computer to sleep
        ctypes.windll.powrprof.SetSuspendState(False, True, False)