import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract header (up to navbar closing)
header_end = html.find('</header>') + len('</header>')
header_html = html[:header_end]
header_html = header_html.replace('href="#home"', 'href="index.html#home"')
header_html = header_html.replace('href="#services"', 'href="index.html#services"')
header_html = header_html.replace('href="#gallery"', 'href="index.html#gallery"')
header_html = header_html.replace('href="#packages"', 'href="index.html#packages"')
header_html = header_html.replace('href="#about"', 'href="index.html#about"')
header_html = header_html.replace('href="#contact"', 'href="index.html#contact"')
header_html = header_html.replace('<title>Landing Page', '<title>Reviews')

# Extract footer
footer_start = html.find('<!--==================== FOOTER ====================-->')
footer_html = html[footer_start:]

# Extract testimonials
test_start = html.find('<!--==================== TESTIMONIALS ====================-->')
test_end = html.find('<!--==================== BOOK APPOINTMENT ====================-->')
test_html = html[test_start:test_end]

# For reviews page, remove the active class from the first link, maybe make the 'Reviews' link active
header_html = header_html.replace('nav-link active', 'nav-link')
header_html = header_html.replace('<a href="reviews.html" class="nav-link">Reviews</a>', '<a href="reviews.html" class="nav-link active">Reviews</a>')

reviews_page = header_html + '\n\n    <main style="padding-top: 100px;">\n' + test_html + '\n    </main>\n\n' + footer_html

with open('reviews.html', 'w', encoding='utf-8') as f:
    f.write(reviews_page)

# Update index.html
new_index = html[:test_start] + html[test_end:]
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_index)

print('Done')
