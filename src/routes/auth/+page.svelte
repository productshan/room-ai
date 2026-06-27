<script>
</script>

<div class="flex h-screen w-screen justify-center items-center bg-primary">
	<div class="flex flex-col-reverse md:flex-row p-4 h-3/5 md:h-4/5 gap-2 md:gap-4 w-4/5 bg-secondary shadow-xl rounded-3xl">
		<div class="flex flex-col rounded-2xl p-4 border-gray-200 w-full md:w-2/5 justify-center">
			<div class="flex flex-col">
				<h3 class="font-semibold text-2xl text-active">Welcome,</h3>
				<p class="text-semi">Login or Sign Up to proceed</p>
			</div>
			<div class="flex flex-col gap-3 mt-4">
				<input
					class="w-full resize-none rounded-3xl border-05 p-4 shadow-sm"
					placeholder="Username"
				/>
				<input
					class="w-full resize-none rounded-3xl border-05 p-4 shadow-sm"
					placeholder="Password"
					type="password"
				/>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 w-full gap-3 mt-6">
				<div class="order-2 md:order-1 flex w-full resize-none rounded-3xl p-4 bg-white shadow-sm">
					<p class="text-center w-full font-semibold text-semi">Sign Up</p>
				</div>
				<div class="order-1 md:order-2 flex w-full resize-none rounded-3xl bg-primary p-4 shadow-sm">
					<p class="text-center w-full font-semibold text-active">Login</p>
				</div>
			</div>
		</div>
		<div class="flex flex-1 bg-red-200 rounded-3xl"></div>
	</div>
</div>
