#!/usr/bin/env python3
"""Static server that refuses to let anything be cached."""
import http.server, socketserver, sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8099


class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    # never answer a conditional request with 304
    def send_head(self):
        for h in ("If-Modified-Since", "If-None-Match"):
            del self.headers[h]        # no-op when absent
        return super().send_head()


socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", PORT), NoCache) as httpd:
    print(f"serving on http://127.0.0.1:{PORT}/ with caching disabled")
    httpd.serve_forever()
