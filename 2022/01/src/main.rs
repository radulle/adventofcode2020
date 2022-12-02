fn main() {
    let data = include_str!("../data.txt").lines();

    let mut v: Vec<u32> = vec![0];
    let mut i: usize = 0;

    for line in data {
        if line.is_empty() {
            i = i + 1;
            v.push(0);
            continue;
        }
        v[i] = v[i] + u32::from_str_radix(line, 10).unwrap_or(0);
    }

    v.sort_unstable_by(|a, b| b.cmp(a));

    println!("{}", v[0]);
    println!("{}", v[0..3].iter().sum::<u32>());
}
