from utils.data_loader import get_recommendations

def main():
    print(get_recommendations(title='To', recommendations_number=2))


if __name__ == "__main__":
    main()
