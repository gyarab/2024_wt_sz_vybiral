import httpx

def get_exchange_rate():
    url = "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt?date=13.02.2025"
    r = httpx.get(url)

    lines = r.text.split("\n")

    row = ""
    for line in lines:
        if "|EUR|" in line:
            row = line

    row_arr = row.split("|")

    kurz_str = row_arr[-1]
    kurz_str = row_arr.replace(",", ".")

    kurz = float(kurz_str)
    return kurz

def convert_currency(amount, rate, direction):
    if direction == "EUR->CZK":
        return amount * rate
    elif direction == "CZK->EUR":
        return amount / rate

def main():
    print("hello!")
    
    kurz = get_exchange_rate()
    
    vstup = input("Zadej částku: ")
    castka = float(vstup)
    
    direction = input("Vyberte stranu převodu (EUR->CZK nebo CZK->EUR): ").strip()
    
    vysledek = convert_currency(castka, kurz, direction)
    
    print(f"Výsledek převodu je: {vysledek:.2f}")

if __name__ == "__main__":
    main()