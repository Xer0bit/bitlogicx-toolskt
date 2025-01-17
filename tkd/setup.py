from setuptools import setup, find_packages

setup(
    name='tkd',
    version='0.1',
    packages=find_packages(),
    install_requires=[
        'Django>=3.2',
    ],
    python_requires='>=3.6',
    author='',
    author_email='',
    description='A Django project',
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',
    url='',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Framework :: Django',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
)