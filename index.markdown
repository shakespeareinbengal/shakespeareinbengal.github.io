---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

<p>These are the categories for all blog posts:</p>
<ul>
{% for category in site.categories %}
<li><a href="{{ site.url }}/category/{{ category | first | url_encode }}/index.html">{{ category | first }}</a></li>
{% endfor %}
</ul>
<p>They link to the corresponding index pages!</p>
