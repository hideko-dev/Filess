<script>
    let password = "";
    let state = "idle";
    let data;
    async function handleFileUpload() {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('password', password)

            try {
                const response = await fetch('http://localhost:1000/upload', {
                    method: 'POST',
                    body: formData,
                });
                console.log()
                const res = await response.json();
                if (response.ok) {
                    data = res
                    state = "ok"
                } else {
                    console.error('Failed to upload file.')
                    state = "failed"
                }
            } catch (error) {
                console.error('Error uploading file:', error)
                state = "error";
            }
        }
    }
</script>

<main>
    <div>
        {#if state === "idle"}
            <h1>File Upload</h1>
            <input type="text" bind:value={password}>
            <input type="file" id="fileInput" />
            <button on:click={handleFileUpload}>Upload</button>
        {:else if state === "ok"}
            <p>ID: {data.id}</p>
            <p>File name: {data.original}</p>
            <p>File size: {data.size}</p>
            <p>Password: {data.password}</p>
            <div>Download URL: <a href={data.url}>{data.url}</a></div>
        {/if}
    </div>
</main>

<style>
    main {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div {
        margin-top: 1rem;
    }
</style>