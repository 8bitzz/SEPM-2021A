#https://dev.to/kalebu/how-to-download-youtube-video-as-audio-using-python-33g9
from youtube_dl import YoutubeDL
audio_downloader = YoutubeDL({'format':'worstaudio[ext=m4a]'})
while True:
    try:
        print('Youtube Downloader'.center(40, '_'))
        URL = input('Enter youtube video/channel url :  ') #url can be single video or a whole channel
        audio_downloader.extract_info(URL)
    except Exception:
        print("Couldn\'t download the audio")
    finally:
        option = int(input('\n1.download again \n2.Exit\n\nOption here :'))
        if option!=1:
            break