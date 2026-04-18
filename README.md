# [Calculadoras](https://elivinsky.github.io/calculadoras)

### Disponibles
{% assign items = site.calculators | sort: 'order' %}
{% for item in items %}
- [{{ item.title }}]({{ item.url | absolute_url }}){% endfor %}

### Próximamente
- ([sugerí una calculadora](https://github.com/elivinsky/calculadoras/issues/new?template=sugerir-funcionalidad.md&title=%5BIDEA%5D%20Nueva%20calculadora:))
