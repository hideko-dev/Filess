<script>
    import Fa from "svelte-fa";
    import {faBolt, faFile, faUpload} from "@fortawesome/free-solid-svg-icons";
    import { fade } from "svelte/transition";
    import { ripple } from "svelte-ripple-action";
    let state = "idle";
    let data = {};
    const server = import.meta.env.VITE_SERVER_URL
    const url = import.meta.env.VITE_URL
    let dl_url;
    let selected;
    let width = 12.5;


    async function handleFileUpload() {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await fetch(`${server}/endpoint`, {
                    method: 'POST',
                    body: formData,
                });
                const res = await response.json();
                if (response.ok) {
                    data = res
                    dl_url = `${url}/download/${data.id}`
                    state = "ok"
                    width = 35
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
    <div class="content" style="width: {width}rem">
        {#key state}
            <div transition:fade>
                {#if state === "idle"}
                    <div class="title">
                        <h1>Filess</h1>
                        <p>v1</p>
                    </div>
                    <div class="boxes">
                        <div class="input" use:ripple>
                            <Fa icon={faFile}/>
                            <p>Upload file</p>
                            <input type="file" id="fileInput" on:change={() => selected = true}/>
                        </div>
                        <div class="box" style={`color: ${selected ? "#00e0c1" : "gray"}`}>
                            <Fa icon={faBolt}/>
                        </div>
                    </div>
                    <div class="btn" on:click={handleFileUpload} use:ripple>
                        <Fa icon={faUpload}/>
                        <p>Upload</p>
                    </div>
                {:else if state === "ok"}
                    <p>ID: {data.id}</p>
                    <p>File name: {data.name}</p>
                    <p>File size: {data.size}</p>
                    <p>File extension: {data.extension}</p>
                    <div>Download URL: <a href={dl_url}>{dl_url}</a></div>
                {/if}
            </div>
        {/key}
    </div>
</main>

<style>
    main {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        text-align: center;
    }
    .title {
        display: flex;
        justify-content: center;
        gap: 2px;
        color: #676767;
    }
    .content {
        padding: 1rem;
        background: white;
        border: 1px solid gray;
        border-radius: 15px;
        transition: all 0.3s;
    }
    .input {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 8rem;
        height: 2rem;
        background:white;
        border: 1px solid gray;
        border-radius: 7px;
        font-size: 15px;
        color: gray;
        transition: all 0.2s;
        cursor: pointer;
        gap: 5px;
        margin: 5px auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
    }
    .input:hover {
        color: black;
        border-color: black;
    }
    .boxes {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    input {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }
    .box {
        width: 2rem;
        height: 2rem;
        background:white;
        border: 1px solid gray;
        color: gray;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 4px;
        transition: all 0.3s;
    }
    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        outline: none;
        border: 1px solid gray;
        width: 10.2rem;
        height: 2rem;
        border-radius: 7px;
        background: white;
        color: gray;
        font-family: 'Inter', sans-serif;
        margin: 0 auto;
        font-size: 15px;
        transition: all 0.2s;
        cursor: pointer;
    }
    .btn:hover {
        color: black;
        border-color: black;
    }
</style>