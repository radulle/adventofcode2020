def get_input(file_name):
    file = open(file_name)
    return file.readlines()


def parse_input(input, part=0):
    input = [line.split()[1:] for line in input]
    if part == 0:
        return [list(map(int, line)) for line in input]
    return [[int("".join(line))] for line in input]


def solve(input, part=0):
    times, distances = parse_input(get_input(input), part)
    wins = [0 for _ in range(len(times))]
    for i in range(len(wins)):
        for speed in range(1, times[i]):
            if speed * (times[i] - speed) > distances[i]:
                wins[i] = wins[i] + 1
    count = 1
    for win in wins:
        count *= win
    return count


assert solve("example.txt") == 288
assert solve("example.txt", 1) == 71503

print(solve("data.txt"))
print(solve("data.txt", 1))
