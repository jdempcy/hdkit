describe SSHKit::Interactive::Command do
  describe '#ssh_cmd_args' do
    def command_args(host)
      command = SSHKit::Interactive::Command.new(host)
      command.ssh_cmd_args
    end

    it 'handles a simple hostname' do
      host = SSHKit::Host.new('example.com')

      expect(command_args(host)).to include('-A')
    end

    it 'handles a username and port' do
      host = SSHKit::Host.new('someuser@example.com:2222')

      expect(command_args(host)).to include('-A')
      expect(command_args(host)).to include('-l someuser')
      expect(command_args(host)).to include('-p 2222')
    end

    it 'handles a proxy' do
      host = SSHKit::Host.new('someuser@example.com:2222')
      host.ssh_options = {
        proxy: Net::SSH::Proxy::Command.new('ssh mygateway.com -W %h:%p')
      }

      expect(command_args(host)).to include('-A')
      expect(command_args(host)).to include('-l someuser')
      expect(command_args(host)).to include('-p 2222')
      expect(command_args(host)).to include('-o "ProxyCommand ssh mygateway.com -W %h:%p"')
    end

    it 'handles keys option' do
      host = SSHKit::Host.new('example.com')
      host.ssh_options = { keys: %w(/home/user/.ssh/id_rsa) }

      expect(command_args(host)).to include('-A')
      expect(command_args(host)).to include('-i /home/user/.ssh/id_rsa')
    end

    it 'handles keys on host' do
      host = SSHKit::Host.new('example.com')
      host.keys = ['~/.ssh/some_key_here']

      expect(command_args(host)).to include('-A')
      expect(command_args(host)).to include('-i ~/.ssh/some_key_here')
    end

    it 'handles a host_name' do
      host = SSHKit::Host.new('example.com')
      host.ssh_options = { host_name: 'foo.bar' }

      expect(command_args(host)).to include('-A')
      expect(command_args(host)).to include('-o "HostName foo.bar"')
    end

    it 'handles disabled forward agent' do
      host = SSHKit::Host.new('example.com')
      host.ssh_options = { forward_agent: false }

      expect(command_args(host)).not_to include('-A')
    end

    it 'handles auth methods' do
      host = SSHKit::Host.new('example.com:2222')
      host.ssh_options = { auth_methods: %w(publickey password) }

      expect(command_args(host)).to include('-o "PreferredAuthentications publickey,password"')
    end

    it 'handles port option' do
      host = SSHKit::Host.new('example.com:2222')
      host.ssh_options = { port: 3232 }

      expect(command_args(host)).to include('-p 3232')
    end
  end

  describe '#to_s' do
    let(:host)    { SSHKit::Host.new('example.com') }
    let(:command) { SSHKit::Command.new(:ls) }

    it 'includes options' do
      cmd = SSHKit::Interactive::Command.new(host, command)

      expect(cmd).to receive(:ssh_cmd_args).and_return(%w(-A -B -C))
      expect(cmd.to_s).to eq('ssh -A -B -C example.com \'$SHELL -l -c "/usr/bin/env ls"\'')
    end

    it 'excludes options if they\'re blank' do
      cmd = SSHKit::Interactive::Command.new(host, command)

      expect(cmd).to receive(:ssh_cmd_args).and_return([])
      expect(cmd.to_s).to eq('ssh example.com \'$SHELL -l -c "/usr/bin/env ls"\'')
    end

    it 'accepts a remote command' do
      cmd = SSHKit::Interactive::Command.new(host, command)

      expect(cmd.to_s).to eq('ssh -t -A example.com \'$SHELL -l -c "/usr/bin/env ls"\'')
    end
  end
end
