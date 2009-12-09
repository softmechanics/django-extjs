from django.conf.urls.defaults import *
from django.views.generic.simple import direct_to_template

from example_views import *

urlpatterns = patterns('',
    (r'^json/email$', example_email),
    (r'^json/model$', example_model),
    (r'^json/grid$', test_grid),
    (r'^grid$', direct_to_template, {'template': 'grid.html'}),
    (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': 'django_extjs/static'}),
)
