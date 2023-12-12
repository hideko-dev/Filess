<script>
    import { page } from "$app/stores";
    import {onMount} from "svelte";
    let id  = $page.params.id;
    let data = {};
    let state = "wait";
    const url = import.meta.env.VITE_URL
    const server = import.meta.env.VITE_SERVER_URL

    onMount(async () => {
        const formData = new FormData();
        formData.append('id', id);
        try {
            const response = await fetch(`${server}/download`, {
                method: 'POST',
                body: formData,
            });
            data = await response.json();
            if (response.ok) {
                state = "success"
                console.log(data)
            } else {
                state = "core-error"
            }
        } catch (error) {
            state = "error"
        }
    })
</script>

{#if state === "wait"}
    <p>{state}</p>
{:else if state === "success"}
    <p>ID: {data.id}</p>
    <p>AT: {data.uploaded_at}</p>
    <p>NAME: {data.name}</p>
    <p>EXTENSION: {data.extension}</p>
    <p>SIZE: {data.size}</p>
    <p>URL: {data.url}</p>
    <p>TYPE: {data.type}</p>
{:else if state === "error"}
    <p>File not found</p>
{/if}