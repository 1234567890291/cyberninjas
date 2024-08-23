import sys
from PyQt5.QtCore import *
from PyQt5.QtWidgets import *
from PyQt5.QtGui import QIcon, QFont
from PyQt5.QtWebEngineWidgets import *

class BrowserWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Simple Browser")
        self.setGeometry(100, 100, 1000, 800)

        # Set application icon
        app_icon = QIcon('icons/browser.png')
        self.setWindowIcon(app_icon)

        # Central widget - Web Engine View
        self.browser = QWebEngineView()
        self.browser.setUrl(QUrl("https://galaxy.com"))
        self.setCentralWidget(self.browser)

        # Navigation Bar
        self.setup_navigation_bar()

        # Developer Tools
        self.dev_tools = None

        # Download Manager
        self.download_manager = self.browser.page().profile().downloadRequested.connect(self.on_download_requested)

    def setup_navigation_bar(self):
        navigation_bar = QToolBar()
        self.addToolBar(navigation_bar)

        # URL Bar
        self.url_bar = QLineEdit()
        self.url_bar.setFont(QFont("Arial", 12))
        self.url_bar.returnPressed.connect(self.navigate_to_url)
        navigation_bar.addWidget(self.url_bar)

        # Update URL when page changes
        self.browser.urlChanged.connect(self.update_url_bar)

    def navigate_home(self):
        self.browser.setUrl(QUrl("https://galaxy.com"))

    def navigate_to_url(self):
        url = self.url_bar.text()
        if not url.startswith('http'):
            url = 'http://' + url
        self.browser.setUrl(QUrl(url))

    def update_url_bar(self, q):
        self.url_bar.setText(q.toString())

    def on_download_requested(self, download):
        # Get the suggested file name
        file_info = QFileInfo(download.path())
        suggested_name = file_info.fileName()

        # Ask user for download location
        save_path, _ = QFileDialog.getSaveFileName(self, "Save File", suggested_name)

        if save_path:
            download.setPath(save_path)
            download.finished.connect(lambda: self.download_finished(download))
            download.downloadProgress.connect(lambda bytes_received, total_bytes: self.update_download_progress(download, bytes_received, total_bytes))
            download.accept()

    def download_finished(self, download):
        QMessageBox.information(self, "Download Complete", f"Download of {download.path()} finished successfully.")

    def update_download_progress(self, download, bytes_received, total_bytes):
        progress = int((bytes_received / total_bytes) * 100)
        print(f"Downloaded {progress}%")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setStyle('Fusion')

    window = BrowserWindow()
    window.show()

    sys.exit(app.exec_())
