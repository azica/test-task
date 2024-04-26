document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');
    const searchInput = document.getElementById('searchInput');
    const tableHeaders = document.querySelectorAll('#postsTable th');
    let postsData = [];
    let sortColumnIndex = -1;
    let sortOrder = 1;

    const fetchData = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Не удалось загрузить посты');
                }
                return response.json();
            })
            .then(data => {
                postsData = data;
                renderTable(postsData);
            })
            .catch(error => console.error('Не удалось загрузить посты:', error));
    };

    const renderTable = (posts) => {
        tableBody.innerHTML = posts.map(post => `
            <tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
            </tr>
        `).join('');
    };

    const sortTable = (columnIndex) => {
        if (sortColumnIndex === columnIndex) {
            sortOrder *= -1;
        } else {

            sortColumnIndex = columnIndex;
            sortOrder = 1;
        }

        postsData.sort((a, b) => {
            const itemA = getColumnValue(a, columnIndex);
            const itemB = getColumnValue(b, columnIndex);
            return itemA.localeCompare(itemB) * sortOrder;
        });

        renderTable(postsData);
    };

    const getColumnValue = (obj, columnIndex) => {
        switch (columnIndex) {
            case 0:
                return obj.id;
            case 1:
                return obj.title;
            case 2:
                return obj.body;
            default:
                return '';
        }
    };

    tableHeaders.forEach((header, index) => {
        header.addEventListener('click', () => {
            sortTable(index);
        });
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm.length >= 3) {
            const filteredPosts = postsData.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.body.toLowerCase().includes(searchTerm)
            );
            renderTable(filteredPosts);
        } else {
            renderTable(postsData);
        }
    });

    fetchData();
});
