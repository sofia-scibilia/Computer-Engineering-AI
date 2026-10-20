# Specificity puzzle — answers

| # | Color | Winning rule | Specificity |
|---|-------|--------------|-------------|
| 1 | red | `#first` | (1,0,0) beats every class-based rule |
| 2 | purple | `section .note` | (0,1,1) ties with `p.note` (0,1,1), but comes later |
| 3 | brown | `#third { … !important }` | `!important` beats even the inline style |
| 4 | orange | `section p` | (0,0,2) beats `p` (0,0,1) |
| 5 | blue | `p.note` | (0,1,1) beats `.note` (0,1,0); the second `.note` (teal) wins only against the first |

Key takeaway: source order only decides between rules with the **same** specificity.
