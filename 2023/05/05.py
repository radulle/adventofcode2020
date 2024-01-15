def get_input(file_name):
    file = open(file_name)
    return file.readlines()


def parse_input(input, part=0):
    seeds = input.pop(0).split()
    seeds.pop(0)
    seeds = list(map(lambda s: (int(s), int(s)), seeds))
    if part == 1:
        for i in range(0, len(seeds), 2):
            seeds[i] = (seeds[i][0], seeds[i + 1][0] + seeds[i][0])
        seeds = seeds[0::2]
    transforms, i = [], 2
    for line in input:
        if "map" in line:
            transforms.append([])
        elif len(line) > 1:
            dest, src, length = list(map(int, line.split()))
            transforms[-1].append((src, src + length - 1, dest - src))
    return seeds, transforms


def solve(input, part=0):
    seeds, transforms = parse_input(get_input(input), part)
    for transform in transforms:
        nseeds = []
        for bot, top in seeds:
            sect = []
            for BOT, TOP, diff in transform:
                if bot > TOP or top < BOT:
                    continue
                if bot >= BOT:
                    if top <= TOP:
                        nseeds.append((bot + diff, top + diff))
                        sect.append((bot, top))
                    else:
                        nseeds.append((bot + diff, TOP + diff))
                        sect.append((bot, TOP))
                else:
                    if top <= TOP:
                        nseeds.append((BOT + diff, top + diff))
                        sect.append((BOT, top))
                    else:
                        nseeds.append((BOT + diff, TOP + diff))
                        sect.append((BOT, TOP))
            if len(sect) == 0:
                nseeds.append((bot, top))
                continue
            sect.sort()
            if sect[0][0] > bot:
                nseeds.append((bot, sect[0][0] - 1))
            if sect[-1][-1] < top:
                nseeds.append((sect[-1][-1] + 1, top))
        seeds = nseeds
    seeds.sort()
    return seeds[0][0]


assert solve("example.txt") == 35
assert solve("example.txt", 1) == 46

print(solve("data.txt"))
print(solve("data.txt", 1))
