import re


def get_input(file_name):
    file = open(file_name)
    return file.readlines()


def get_matches(card):
    card = re.sub(r"Card +\d+: +", "", card)
    winning_numbers, card_numbers = card.split(" | ")
    winning_numbers = list(map(int, winning_numbers.split()))
    card_numbers = list(map(int, card_numbers.split()))
    matches = 0
    for number in winning_numbers:
        if number in card_numbers:
            matches += 1
    return matches


def get_worth(card):
    worth = get_matches(card)
    if worth == 0:
        return 0
    return 2 ** (worth - 1)


cards = get_input("example.txt")
assert get_worth(cards[0]) == 8
assert get_worth(cards[1]) == 2
assert get_worth(cards[2]) == 2
assert get_worth(cards[3]) == 1
assert get_worth(cards[4]) == 0
assert get_worth(cards[5]) == 0
assert sum([get_worth(card) for card in cards]) == 13

cards = get_input("data.txt")
print(sum([get_worth(card) for card in cards]))


def get_count(cards):
    count = [1 for card in cards]
    i = 0
    while i < len(cards):
        matches = get_matches(cards[i])
        for j in range(i + 1, i + 1 + matches):
            count[j] += count[i]
        i += 1
    return sum(count)


cards = get_input("example.txt")
assert get_count(cards) == 30


cards = get_input("data.txt")
print(get_count(cards))
