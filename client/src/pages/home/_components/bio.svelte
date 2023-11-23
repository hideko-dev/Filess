<script>
    import catIcon from "$lib/assets/cat.webp"
    const years = [
        {year: "2010", content: "Born in Miyazaki (宮崎), Japan"},
        {year: "2018", content: "Hello to world"},
        {year: "2023", content: "Hello to world"},
        {year: "2023", content: "Hello to world"},
    ];
</script>

<section>
    <p class="title">Bio</p>
    <div class="years">
        {#each years as c}
            <div class="year">
                <p class="main">{c.year}</p>
                <div class="line"/>
                <p class="content">{c.content}</p>
            </div>
        {/each}
    </div>
</section>

<style>
    section {
        margin-top: 3rem;
        margin-bottom: 4rem;
    }
    .title {
        font-weight: 700;
        font-size: 25px;
    }
    .years {
        margin-top: 15px;
    }
    .year {
        display: flex;
        align-items: center;
        margin-block: 5px;
    }
    .main {
        font-weight: 600;
        width: 40px;
    }
    .line {
        height: 10px;
        width: 2px;
        background: var(--text-thin);
        margin-inline: 6px;
    }
</style>